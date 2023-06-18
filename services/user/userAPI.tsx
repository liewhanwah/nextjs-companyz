export async function fetchList(page = 1): Promise<{ data: any }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_USER_LIST_API}?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ page }),
    }
  );
  const result = await response.json();
  return result && result.data ? result.data : [];
}
