import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import type { UpdateTaskInput } from "@/types/task";

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  const body: UpdateTaskInput = await request.json();

  const { data, error } = await getSupabase()
    .from("tasks")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await getSupabase()
    .from("tasks")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
