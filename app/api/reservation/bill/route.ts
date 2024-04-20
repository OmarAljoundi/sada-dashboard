import { ReservationBills, Reservations } from "@/db_types";
import { supabaseClient } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = (await req.json()) as ReservationBills;
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: session_response, error: session_error } =
      await supabase.auth.getUser();

    if (!session_response?.user)
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized!",
        },
        { status: 401 }
      );

    const { data: authUser } = await supabaseClient
      .from("users")
      .select("*")
      .eq("user_id", session_response!.user.id)
      .single();

    const { data, error } = await supabaseClient
      .from("reservation_bills")
      .insert({
        ...body,
      })
      .select("*")
      .single();

    console.log("error", error);
    if (error) {
      throw new Error(error.details);
    }

    return NextResponse.json(
      {
        success: true,
        result: data,
      },
      { status: 200 }
    );
  } catch (ex) {
    return NextResponse.json(
      {
        success: false,
        message: ex,
      },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = (await req.json()) as ReservationBills;
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: session_response, error: session_error } =
      await supabase.auth.getUser();

    if (!session_response?.user)
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized!",
        },
        { status: 401 }
      );

    const { bill_amount, bill_date, created_at, id, payment_method } = body;

    const { data, error } = await supabaseClient
      .from("reservation_bills")
      .update({
        bill_amount,
        bill_date,
        created_at,
        payment_method,
      })
      .eq("id", id!)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.details);
    }

    return NextResponse.json(
      {
        success: true,
        result: data,
      },
      { status: 200 }
    );
  } catch (ex) {
    return NextResponse.json(
      {
        success: false,
        message: ex,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data: session_response, error: session_error } =
      await supabase.auth.getUser();

    if (!session_response?.user)
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized!",
        },
        { status: 401 }
      );

    const { data: authUser } = await supabaseClient
      .from("users")
      .select("*")
      .eq("user_id", session_response!.user.id)
      .single();

    const { data, error } = await supabaseClient
      .from("reservation_bills")
      .delete()
      .eq("id", Number(id));

    if (error) {
      throw new Error(error.details);
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (ex) {
    return NextResponse.json(
      {
        success: false,
        message: ex,
      },
      { status: 400 }
    );
  }
}
