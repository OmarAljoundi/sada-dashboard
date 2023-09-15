import { Order, SearchQuery, getEqOperator } from "@/helper-types";
import { supabaseClient } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

type OrQuriesProp = {
  forigenTable: string | null;
  query: string;
};
const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  let from = page ? page * limit : 0;
  let to = page ? from + size : size;

  if (from !== 0) {
    ++from;
    ++to;
  }

  return { from, to };
};

export async function POST(req: Request, res: Response) {
  try {
    var OrQuries: OrQuriesProp[] = [];

    const requestData = (await req.json()) as SearchQuery;
    var query = supabaseClient
      .from(requestData.Table!)
      .select(requestData.Select, { count: "exact" });

    requestData.FilterByOptions.map((i) => {
      if (i.MemberName.includes(".")) {
        let memberNames = i.MemberName?.split(".");
        if (OrQuries.find((x) => x.forigenTable == memberNames[0])) {
          OrQuries.map((o) => {
            if (o.forigenTable == memberNames[0]) {
              o.query += `${memberNames[1]}.${getEqOperator(
                i.FilterOperator
              )}.${i.FilterFor},`;
            }
          });
        } else {
          OrQuries.push({
            forigenTable: memberNames[0],
            query: `${memberNames[1]}.${getEqOperator(i.FilterOperator)}.${
              i.FilterFor
            },`,
          });
        }
      } else {
        OrQuries.push({
          forigenTable: null,
          query: `${i.MemberName}.${getEqOperator(i.FilterOperator)}.${
            i.FilterFor
          },`,
        });
      }
    });

    if (OrQuries.length > 0) {
      OrQuries.map((o) => {
        o.query = o.query.slice(0, -1);
        if (o.forigenTable) {
          query = query.or(o.query, { foreignTable: o.forigenTable });
        } else {
          query = query.or(o.query);
        }
      });
    }

    if (requestData.OrderByOptions.length > 0) {
      query = query.order(requestData.OrderByOptions[0].MemberName, {
        ascending:
          requestData.OrderByOptions[0].SortOrder == Order.ASC ? true : false,
      });
    }

    if (requestData.Table == "Tour") {
      console.log("query", requestData);
    }

    const { from, to } = getPagination(
      requestData.PageIndex,
      requestData.PageSize
    );
    console.log("from", from);
    console.log("from", to);
    query = query.range(from, to);

    const { data: result, count, error } = await query;
    console.log("count", count);

    if (error) {
      console.error(error);
      throw new Error(error.details);
    }
    return NextResponse.json({
      success: true,
      results: result,
      result: result[0] ?? null,
      total: count,
    });
  } catch (ex) {
    console.log("ex", ex);
    return NextResponse.json({
      success: false,
      data: ex as any,
    });
  }
}
