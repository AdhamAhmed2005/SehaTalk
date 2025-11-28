import { connectDB } from "@/lib/mongodb";
import Question from "@/models/Question";
import { NextResponse } from "next/server";

// GET /api/questions/[id] - Get a single question
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const question = await Question.findById(id)
      .populate("patient", "name avatarUrl age gender")
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

    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    // Increment view count
    await Question.findByIdAndUpdate(id, { $inc: { viewsCount: 1 } });

    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch question" },
      { status: 500 }
    );
  }
}

// PATCH /api/questions/[id] - Update a question
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const question = await Question.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    )
      .populate("patient", "name avatarUrl")
      .populate("category", "name slug");

    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: question,
      message: "Question updated successfully",
    });
  } catch (error) {
    console.error("Error updating question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update question" },
      { status: 500 }
    );
  }
}

// DELETE /api/questions/[id] - Delete a question
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete question" },
      { status: 500 }
    );
  }
}
