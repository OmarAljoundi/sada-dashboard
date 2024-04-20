import { Reservations } from "@/db_types";
import { supabaseClient } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = (await req.json()) as Reservations;
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

    if (!body.id) {
      if (!body.sold_by) body.sold_by = authUser!.name;

      body.created_by = authUser!.name;

      const { data, error } = await supabaseClient
        .from("reservations")
        .insert({
          ...body,
        })
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
    }

    body.modified_by = authUser!.name;
    body.client_id = body.clients?.id;
    
    delete body.reservation_bills;
    delete body.reservation_costs;
    delete body.clients;

   

    body.modified_at = new Date().toISOString();
    const { data, error } = await supabaseClient
      .from("reservations")
      .update({
        ...body,
      })
      .eq("id", body.id)
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
