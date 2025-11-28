import { connectDB } from "@/lib/mongodb";
import Question from "@/models/Question";
import { NextResponse } from "next/server";

// GET /api/questions - Get all questions with pagination
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (category) {
      query.category = category;
    }

    // Get questions with populated references
    const questions = await Question.find(query)
      .populate("patient", "name avatarUrl")
      .populate("category", "name slug")
      .populate({
        path: "replies",
        populate: {
          path: "doctor",
          select: "name specialty verified avatarUrl",
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Question.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: questions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

// POST /api/questions - Create a new question
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      patient,
      title,
      description,
      category,
      urgencyLevel,
      previousTreatments,
      attachments,
    } = body;

    // Validate required fields
    if (!patient || !title || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create question
    const question = await Question.create({
      patient,
      title,
      description,
      category,
      urgencyLevel,
      previousTreatments,
      attachments: attachments || [],
    });

    // Populate references before returning
    await question.populate("patient", "name avatarUrl");
    await question.populate("category", "name slug");

    return NextResponse.json(
      {
        success: true,
        data: question,
        message: "Question created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create question" },
      { status: 500 }
    );
  }
}
