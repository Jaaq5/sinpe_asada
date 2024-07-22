import { tursoClient } from "@/db/turso-client";

export const runtime = "edge";

export const revalidate = 0;

export interface Member {
  memberId: number;
  memberServiceNumber: number;
  memberName: string;
  memberLocation: string;
  memberPhoneNumber: number;
}

async function getData() {
  try {
    const res = await tursoClient().execute("select * from members;");
    return {
      members: res.rows as unknown as Member[],
    };
  } catch (error) {
    console.error(error);
    return {
      members: [],
    };
  }
}

export default async function Page(page: any) {
  const { members } = await getData();

  return (
    <>
      <h1 id="home">Top web frameworks</h1>

      <div className="mb-32 flex flex-col text-center lg:mb-0 lg:text-left">
        <div className="mt-20 overflow-x-auto rounded-lg border border-gray-200 w-[80vw] max-w-2xl">
          <table className="w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Sector</th>
                <th>Stars</th>
                <th>Repo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.memberId}>
                  <td>{member.memberName}</td>
                  <td>{member.memberLocation}</td>
                  <td className="stars">{member.memberServiceNumber}</td>
                  <td className="whitespace-nowrap text-center px-4 py-2">
                    <a
                      href={member.memberName}
                      target="_blank"
                      className="group rounded-lg border border-transparent px-2 py-1 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    >
                      Visit 🔗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
