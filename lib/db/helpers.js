import Question from "@/models/Question";
import Answer from "@/models/Answer";
import Patient from "@/models/Patient";
import Doctor from "@/models/Doctor";
import Category from "@/models/Category";

/**
 * Database helper functions for common operations
 */

// Question Helpers
export const questionHelpers = {
  /**
   * Get questions with full details (patient, category, replies with doctors)
   */
  async getQuestionsWithDetails(filter = {}, options = {}) {
    const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
    const skip = (page - 1) * limit;

    const questions = await Question.find(filter)
      .populate("patient", "name avatarUrl age gender")
      .populate("category", "name slug description")
      .populate({
        path: "replies",
        populate: {
          path: "doctor",
          select: "name specialty verified avatarUrl",
        },
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Question.countDocuments(filter);

    return {
      questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  },

  /**
   * Get a single question with all details
   */
  async getQuestionById(id) {
    return await Question.findById(id)
      .populate("patient", "name avatarUrl age gender medicalHistory")
      .populate("category", "name slug description")
      .populate({
        path: "replies",
        populate: {
          path: "doctor",
          select: "name specialty verified avatarUrl bio",
        },
        options: { sort: { createdAt: -1 } },
      })
      .lean();
  },

  /**
   * Get trending questions (most views/likes in last 7 days)
   */
  async getTrendingQuestions(limit = 5) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return await Question.find({
      createdAt: { $gte: sevenDaysAgo },
    })
      .populate("patient", "name avatarUrl")
      .populate("category", "name slug")
      .sort({ viewsCount: -1, likesCount: -1 })
      .limit(limit)
      .lean();
  },

  /**
   * Search questions by keyword
   */
  async searchQuestions(keyword, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const searchQuery = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const questions = await Question.find(searchQuery)
      .populate("patient", "name avatarUrl")
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Question.countDocuments(searchQuery);

    return {
      questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  },
};

// Doctor Helpers
export const doctorHelpers = {
  /**
   * Get verified doctors by specialty
   */
  async getVerifiedDoctors(specialty = null) {
    const filter = { verified: true };
    if (specialty) {
      filter.specialty = specialty;
    }

    return await Doctor.find(filter)
      .select("-password")
      .sort({ name: 1 })
      .lean();
  },

  /**
   * Get doctor with their answer statistics
   */
  async getDoctorWithStats(doctorId) {
    const doctor = await Doctor.findById(doctorId)
      .select("-password")
      .lean();

    if (!doctor) return null;

    const answerCount = await Answer.countDocuments({ doctor: doctorId });
    const answers = await Answer.find({ doctor: doctorId })
      .populate("question", "title")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return {
      ...doctor,
      stats: {
        totalAnswers: answerCount,
      },
      recentAnswers: answers,
    };
  },
};

// Patient Helpers
export const patientHelpers = {
  /**
   * Get patient with their question history
   */
  async getPatientWithQuestions(patientId) {
    const patient = await Patient.findById(patientId)
      .select("-password")
      .lean();

    if (!patient) return null;

    const questions = await Question.find({ patient: patientId })
      .populate("category", "name slug")
      .populate({
        path: "replies",
        populate: { path: "doctor", select: "name specialty" },
      })
      .sort({ createdAt: -1 })
      .lean();

    return {
      ...patient,
      questions,
      stats: {
        totalQuestions: questions.length,
        answeredQuestions: questions.filter((q) => q.replies.length > 0)
          .length,
      },
    };
  },
};

// Category Helpers
export const categoryHelpers = {
  /**
   * Get categories with question counts
   */
  async getCategoriesWithStats() {
    const categories = await Category.find().lean();

    const categoriesWithStats = await Promise.all(
      categories.map(async (category) => {
        const questionCount = await Question.countDocuments({
          category: category._id,
        });

        return {
          ...category,
          questionCount,
        };
      })
    );

    return categoriesWithStats.sort((a, b) => b.questionCount - a.questionCount);
  },

  /**
   * Get category with recent questions
   */
  async getCategoryWithQuestions(slug, limit = 10) {
    const category = await Category.findOne({ slug }).lean();

    if (!category) return null;

    const questions = await Question.find({ category: category._id })
      .populate("patient", "name avatarUrl")
      .populate({
        path: "replies",
        populate: { path: "doctor", select: "name specialty verified" },
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return {
      ...category,
      questions,
    };
  },
};

// Answer Helpers
export const answerHelpers = {
  /**
   * Create an answer and update question
   */
  async createAnswer(questionId, doctorId, content, attachments = []) {
    const answer = await Answer.create({
      question: questionId,
      doctor: doctorId,
      content,
      attachments,
    });

    // Add answer to question's replies array
    await Question.findByIdAndUpdate(questionId, {
      $push: { replies: answer._id },
    });

    // Return populated answer
    return await Answer.findById(answer._id)
      .populate("doctor", "name specialty verified avatarUrl")
      .lean();
  },

  /**
   * Get answers for a question
   */
  async getAnswersForQuestion(questionId) {
    return await Answer.find({ question: questionId })
      .populate("doctor", "name specialty verified avatarUrl bio")
      .sort({ createdAt: -1 })
      .lean();
  },
};

// Statistics Helpers
export const statsHelpers = {
  /**
   * Get platform statistics
   */
  async getPlatformStats() {
    const [
      totalQuestions,
      totalAnswers,
      totalDoctors,
      totalPatients,
      verifiedDoctors,
    ] = await Promise.all([
      Question.countDocuments(),
      Answer.countDocuments(),
      Doctor.countDocuments(),
      Patient.countDocuments(),
      Doctor.countDocuments({ verified: true }),
    ]);

    return {
      totalQuestions,
      totalAnswers,
      totalDoctors,
      totalPatients,
      verifiedDoctors,
      answeredQuestions: await Question.countDocuments({
        replies: { $exists: true, $ne: [] },
      }),
    };
  },
};

export default {
  questionHelpers,
  doctorHelpers,
  patientHelpers,
  categoryHelpers,
  answerHelpers,
  statsHelpers,
};
