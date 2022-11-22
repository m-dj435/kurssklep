import Link from "next/link";

export const Pagination = ({ pages }: { pages: number }) => {
  const pagesArr = Array.from({ length: pages }, (_, i) => {
    return i + 1;
  });
  return (
    <div className=" flex justify-center p-2 gap-4 text-xl bg-gray-200">
      {pagesArr.map((page) => {
        return (
          <Link href={`/productsSSG/page/${page}`} key={page}>
            {page}
          </Link>
        );
      })}
    </div>
  );
};
