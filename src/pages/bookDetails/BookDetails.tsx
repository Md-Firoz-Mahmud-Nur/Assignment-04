import Loader from "@/components/Loader";
import { useGetSingleBookQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router";

const BookDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const book = data?.data;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="animate-fade-in mx-auto max-w-4xl p-6">
      <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 md:flex md:gap-8">
        {/* Left column: book info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-extrabold text-gray-900">
            {book?.title}
          </h2>

          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 font-medium">
              Author: {book?.author}
            </span>
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 font-medium">
              Genre: {book?.genre}
            </span>
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 font-medium">
              ISBN: {book?.isbn}
            </span>
          </div>

          <p className="mt-4 leading-relaxed text-gray-700">
            {book?.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Total Copies:</span>{" "}
              {book?.copies}
            </div>
            <div>
              <span className="font-semibold">Availability:</span>{" "}
              {book?.available ? (
                <span className="ml-1 rounded bg-green-100 px-2 py-1 text-sm font-medium text-green-700">
                  In Stock
                </span>
              ) : (
                <span className="ml-1 rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-700">
                  Out of Stock
                </span>
              )}
            </div>
            <div className="col-span-2 mt-2 text-xs text-gray-400">
              Added on: {new Date(book?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
