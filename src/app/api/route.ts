import { NextResponse, NextRequest } from "next/server";
import { tursoClient } from "@/db/turso-client";
import { Member } from "@/db/types";
//import Filter from "bad-words";

export const runtime = "edge";

/*
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const { memberServiceNumber, memberName, memberLocation, stars } = Object.fromEntries(formData);

  // Create redirect url
  const addNewUrl = req.nextUrl.clone();
  addNewUrl.pathname = "/add-new";

  if (!memberServiceNumber || !memberName || !memberLocation || !stars) {
    NextResponse.redirect(addNewUrl + "?error=Fill in all fields!", {
      status: 422,
    });
  }
  if (
    typeof memberServiceNumber !== "string" ||
    typeof memberName !== "string" ||
    typeof url !== "string" ||
    typeof stars !== "string"
  ) {
    return NextResponse.redirect(addNewUrl + "?error=Wrong Types", {
      status: 422,
    });
  }
  const githubUrlRgx =
    /((?:https?:)?\/\/)?((?:www)\.)?((?:github\.com))(\/(?:[\w-]+))(\/(?:[\w-]+))(\/)?/gi;
  if (!githubUrlRgx.test(url)) {
    return NextResponse.redirect(
      addNewUrl + "?error=Provide a valid GitHub url!",
      { status: 302 }
    );
  }
  if (typeof parseInt(stars) !== "number") {
    return NextResponse.redirect(
      addNewUrl + "?error=Enter a valid number for stars",
      { status: 302 }
    );
  }

  const frameworkExists = await getFramework(memberServiceNumber as string, url as string);

  if (frameworkExists !== null) {
    return NextResponse.redirect(addNewUrl, { status: 302 });
  }

  //const filter = new Filter();
  const add = await tursoClient().execute({
    sql: "insert into frameworks(namemberServiceNumberme, language, url, stars) values(?, ?, ?, ?);",
    args: [
      memberServiceNumber,
      memberName,
      url,
      stars,
    ],
  });

  return NextResponse.redirect(addNewUrl + "?message=Framework added!", {
    status: 302,
  });
}
*/

/**
 * @description Gets framework from the database by filtering the name and url columns
 * @param name Name of the framework being fetched
 * @param url GitHub url of the framework being fetched
 * @returns {Promise<Member|null>}
 */
async function getFramework(
  memberName: string,
  memberLocation: string
): Promise<Member | null> {
  const response = await tursoClient().execute({
    sql: "select * from members",
    args: [memberLocation, memberName],
  });

  if (response.rows.length) {
    return response.rows[0] as unknown as Member;
  }
  return null;
}
