import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET /api/categories - Get all categories
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find({})
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, slug, description, imageUrl } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name,
      slug,
      description,
      imageUrl,
    });

    return NextResponse.json(
      {
        success: true,
        data: category,
        message: "Category created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Category with this slug already exists" },
        { status: 400 }
      );
    }
    console.error("Error creating category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create category" },
      { status: 500 }
    );
  }
}
