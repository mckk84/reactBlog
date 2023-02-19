import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import blogs from "../services/blogApi";
import UserBlock from "../components/UserBlock";

function Blog() 
{
    let { slug } = useParams();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [current_blog, setCurrentBlog] = useState(false);
    const [similar, setSimilarBlogs] = useState(false);

    useEffect(() => 
    {
        console.log('blog', user);
        if( !user ) {
            navigate('/login');
        }
        setTimeout(() => {
          console.log('calling blog api');
          blogs.find(slug).then( blogs => 
          {
              console.log(blogs.data);
              setCurrentBlog(blogs.data.blog);
              setSimilarBlogs(blogs.data.similar);
          }).catch(err => 
          {
              console.log(err);
          });
        }, 0);
        console.log('done');
    }, []);

    return (
        <>
        {current_blog ?
          <div className="container-xl bg-gray-200 mx-auto py-2">
              <section className="text-gray-600 body-font relative">
                <div className="container px-2 py-4 mx-auto flex sm:flex-nowrap flex-wrap">
                  <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 p-2 gap-10 flex flex-col justify-between relative">
                    <div key={current_blog.id} className="bg-white w-full relative flex flex-wrap py-6 shadow-lg">
                      <div className="px-6 w-full">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-xl">{current_blog.title.toUpperCase()}</h2>
                        <p className="mt-1">{current_blog.title_description}, <span className="text-gray-500">{current_blog.date}</span></p>
                      </div>
                      <div className="w-full px-6 mt-4">
                        <p className="leading-relaxed text-normal">{current_blog.content}</p>
                      </div>
                      <div className="w-full px-6 mt-4 flex align-middle justify-between">
                        <button className="px-6 py-4 bg-white">
                          <p className="font-normal text-gray-900">Comments
                              <span className="bg-gray-900 ml-2 text-sm py-1 px-1 text-white">0</span>
                          </p> 
                        </button>
                      </div>
                    </div>  
                  </div>
                  <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto px-0 w-full md:py-0 mt-8 md:mt-0">
                      <UserBlock/>
                      <div className="w-full bg-white shadow-lg mb-4 flex flex-col md:ml-auto w-full mt-8 md:mt-0 border">
                        <h2 className="title-font bg-gray-300 px-4 py-4 text-gray-900 tracking-widest text-xl">Similar Posts</h2>
                        <div className="flex flex-col w-full">
                            {similar.map((blog) => (                
                            <div className="bg-white w-full relative border-b hover:font-semibold hover:bg-gray-100 flex flex-wrap py-3">
                              <div className="px-6 mt-2 lg:mt-0">
                                <a href={"/blogs/"+blog._id} ><p className="leading-relaxed text-gray-900">{blog.title}</p></a>
                                <p className="leading-relaxed text-sm">{blog.title_description}</p>
                              </div>
                            </div>
                            ))}
                        </div>
                      </div>
                  </div>
                </div>
              </section>
          </div>
        :
          <div className="container-xl bg-gray-200 mx-auto py-2">
            <p> Loading. Please wait..</p>
          </div>
        }
        </>
    )
}

export default Blog;
