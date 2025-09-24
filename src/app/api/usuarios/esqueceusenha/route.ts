import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { success: false, message: "E-mail não informado." },
        { status: 400 }
      );
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/resetar",
    });
    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "E-mail enviado! Verifique sua caixa de entrada.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Erro desconhecido." },
      { status: 500 }
    );
  }
}
