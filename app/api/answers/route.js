import { connectDB } from "@/lib/mongodb";
import Answer from "@/models/Answer";
import { NextResponse } from "next/server";
import { translateText } from "@/lib/utils/translateService";

// GET /api/answers - Get all answers (optional filters)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "ar";
    const questionId = searchParams.get("questionId");
    const doctorId = searchParams.get("doctorId");

    // Build query
    const query = {};
    if (questionId) {
      query.question = questionId;
    }
    if (doctorId) {
      query.doctor = doctorId;
    }

    // Get answers with populated references
    const answers = await Answer.find(query)
      .populate("doctor", "name specialty verified avatarUrl")
      .populate("question", "title")
      .sort({ createdAt: -1 })
      .lean();

    // Translate answers if language is not Arabic (default)
    let translatedAnswers = answers;
    if (lang && lang !== "ar") {
      translatedAnswers = await Promise.all(
        answers.map(async (answer) => ({
          ...answer,
          content: await translateText(answer.content, lang),
        }))
      );
    }

    return NextResponse.json({
      success: true,
      data: translatedAnswers,
    });
  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}

// POST /api/answers - Create a new answer
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { question, doctor, content, attachments } = body;

    // Validate required fields
    if (!question || !doctor || !content) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create answer
    const answer = await Answer.create({
      question,
      doctor,
      content,
      attachments: attachments || [],
    });

    // Populate references before returning
    await answer.populate("doctor", "name specialty verified avatarUrl");
    await answer.populate("question", "title");

    return NextResponse.json(
      {
        success: true,
        data: answer,
        message: "Answer created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating answer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create answer" },
      { status: 500 }
    );
  }
}

// PATCH /api/answers - Update an answer
export async function PATCH(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    const { content, attachments } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Answer ID is required" },
        { status: 400 }
      );
    }

    const answer = await Answer.findByIdAndUpdate(
      id,
      {
        content,
        attachments,
        isEdited: true,
      },
      { new: true }
    )
      .populate("doctor", "name specialty verified avatarUrl")
      .populate("question", "title");

    return NextResponse.json({
      success: true,
      data: answer,
      message: "Answer updated successfully",
    });
  } catch (error) {
    console.error("Error updating answer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update answer" },
      { status: 500 }
    );
  }
}

// DELETE /api/answers - Delete an answer
export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Answer ID is required" },
        { status: 400 }
      );
    }

    await Answer.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Answer deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting answer:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete answer" },
      { status: 500 }
    );
  }
}
