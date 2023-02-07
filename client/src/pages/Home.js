import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import blogs from "../services/blogApi";

function Home() 
{
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [latest_blogs, setBlogs] = useState([]);

    useEffect(() => 
    {
      console.log(user);
        if( !user ) {
            navigate('/login');
        }
        blogs.all().then( blogs => {
            console.log(blogs.data);
            setBlogs(blogs.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div className="container-xl bg-gray-200 mx-auto py-2">
            <section className="text-gray-600 body-font relative">
              <div className="container px-2 py-4 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 rounded-lg overflow-hidden sm:mr-10 p-2 gap-10 flex flex-col justify-between relative">
                  {latest_blogs.map((blog) => (                
                  <div key={blog.id} className="bg-white w-full relative flex flex-wrap py-6 shadow-lg">
                    <div className="px-6 w-full">
                      <h2 className="title-font font-medium text-gray-900 tracking-widest text-xl">{blog.title.toUpperCase()}</h2>
                      <p className="mt-1">{blog.title_description}, <span className="text-gray-500">{blog.date}</span></p>
                    </div>
                    <div className="w-full px-6 mt-4">
                      <p className="leading-relaxed text-normal">{blog.content.substr(0, 500)}</p>
                    </div>
                    <div className="w-full px-6 mt-4 flex align-middle justify-between">
                      <button className="border border-gray-400 px-6 py-4 bg-white">
                        <p className="uppercase">Read More >></p> 
                      </button>
                      <button className="px-6 py-4 bg-white">
                        <p className="font-normal text-gray-900">Comments
                            <span className="bg-gray-900 ml-2 text-sm py-1 px-1 text-white">0</span>
                        </p> 
                      </button>
                    </div>
                  </div>
                    ))}  
                </div>
                <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto px-0 w-full md:py-0 mt-8 md:mt-0">
                    <div className="flex align-middle justify-start bg-white border shadow-lg bg-grey-100 mb-4 px-2">
                        <img src="/images/user.svg" className="mt-2 border w-10 h-10 inline-block" />
                        <h2 className="text-gray-900 text-lg mb-1 px-4 py-4 mb-0 font-semibold title-font">{user ? user.name : ''}</h2>
                    </div>
                    <div className="w-full bg-white shadow-lg mb-4 flex flex-col md:ml-auto w-full mt-8 md:mt-0 border">
                      <h2 className="title-font bg-gray-300 px-4 py-4 text-gray-900 tracking-widest text-xl">Popular Posts</h2>
                      <div className="flex flex-col w-full">
                          {latest_blogs.slice(0, 5).map((blog) => (                
                          <div className="bg-white w-full relative border-b hover:font-semibold hover:bg-gray-100 flex flex-wrap py-3">
                            <div className="px-6 mt-2 lg:mt-0">
                              <p className="leading-relaxed text-gray-900">{blog.title}</p>
                              <p className="leading-relaxed text-sm">{blog.title_description}</p>
                            </div>
                          </div>
                          ))}
                      </div>
                    </div>
                    <div className="w-full bg-white shadow-lg flex flex-col md:ml-auto w-full mt-8 md:mt-0 border">
                      <h2 className="title-font bg-gray-300 px-4 py-4 text-gray-900 tracking-widest text-xl">Tags</h2>
                      <div className="flex flex-row gap-2 px-2 py-2 flex-wrap w-full">
                          {latest_blogs.map((blog) => (                
                          <p className="leading-relaxed bg-gray-300 rounded-lg px-1 text-xs">#{blog.category}</p>
                          ))}
                      </div>
                    </div>
                </div>
              </div>
            </section>

        </div>
    );
}

export default Home;
