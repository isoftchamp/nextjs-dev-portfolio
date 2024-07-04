// @flow strict

import BlogCard from "@/app/ui/components/common/blog-card";
import { getBlogs } from "@/app/lib/actions";

export default async function Page() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center mb-5 lg:pb-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          blogs.map((blog, i) => (
            blog?.cover_image &&
            <BlogCard blog={blog} key={`blog_${i}`} />
          ))
        }
      </div>
    </div>
  );
};