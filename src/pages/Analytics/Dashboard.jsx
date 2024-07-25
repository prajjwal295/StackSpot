import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaBookmark, FaHeart, FaUser } from 'react-icons/fa';
import { BsGraphDownArrow, BsGraphUpArrow } from 'react-icons/bs';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/avatar.jpg'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer'
import { useGetAnalyticsQuery, useGetUserPostQuery } from '../../api/post'
import { useUserFollowerListQuery } from '../../api/user';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const userId = userInfo?.user?._id;
  const { data: userData } = useGetUserPostQuery(userId);
  const { data: followerData } = useUserFollowerListQuery(userId);
  const { data: analytics } = useGetAnalyticsQuery();
  const { theme } = useSelector((state) => state.theme);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * 5;
  const endIndex = Math.min(startIndex + 5, followerData?.followers?.length);

  const renderNoFollowersMessage = () => {
    return <h1>You don't have followers :(</h1>;
  };

  const renderNoPostsMessage = () => {
    return <h1>Please post something :(</h1>;
  };

  return (
    <>
      <Navbar />
      <div className={`h-auto  ${theme ? 'bg-black' : 'bg-white'}`}>
        <h1 className={`text-2xl font-semibold pt-5 pb-5 px-5 ${theme ? 'text-white' : 'text-black'}`}>Your Analytics</h1>
        <article className={`flex flex-col md:flex-row gap-4 rounded-lg p-6 ${theme ? 'bg-black text-white ring-1 ring-slate-700' : 'bg-white border border-gray-200'}`}>
          {/* Views */}
          <div className='flex flex-col items-center mx-auto md:w-1/3'>
            <span className="rounded-full bg-slate-200 p-3 text-black ">
              <FaUser />
            </span>
            <div>
              <p className={`text-2xl text-center font-medium ${theme ? 'text-white' : 'text-gray-700'}`}>{followerData?.followers?.length || 0}</p>
              <p className="text-sm text-gray-500">Total Followers</p>
            </div>
            {/* <div className='inline-flex gap-2 px-3 mb-3 rounded bg-green-100 p-1 text-green-600'>
              <BsGraphUpArrow color='green' />
              <span className="text-xs font-medium text-green-500"> 67.81% </span>
            </div> */}
          </div>
          {/* Likes */}
          <div className='flex flex-col items-center mx-auto md:w-1/3'>
            <span className="rounded-full bg-slate-200 p-3 text-black ">
              <FaHeart />
            </span>
            <div>
              <p className={`text-2xl text-center font-medium ${theme ? 'text-white' : 'text-gray-700'}`}>{analytics?.analytics?.totalLikes || 0}</p>
              <p className="text-sm text-gray-500">Total Likes</p>
            </div>
            {/* <div className='inline-flex gap-2 px-3 mb-3 rounded bg-red-100 p-1 text-red-600'>
              <BsGraphDownArrow color='red' />
              <span className="text-xs font-medium text-red-500"> 67.81% </span>
            </div> */}
          </div>
          {/* Bookmark */}
          <div className='flex flex-col items-center mx-auto md:w-1/3'>
            <span className="rounded-full bg-slate-200 p-3 text-black ">
              <FaBookmark />
            </span>
            <div>
              <p className={`text-2xl text-center font-medium ${theme ? 'text-white' : 'text-gray-700'}`}>{analytics?.analytics?.totalBookmarks || 0}</p>
              <p className="text-sm text-gray-500">Total Bookmark</p>
            </div>
            {/* <div className='inline-flex gap-2 px-3 mb-3 rounded bg-red-100 p-1 text-red-600'>
              <BsGraphDownArrow color='red' />
              <span className="text-xs font-medium text-red-500"> 80.81% </span>
            </div> */}
          </div>
        </article>
        <div className={`md:px-[160px] w-full mt-14 flex flex-col md:flex-row ${theme ? 'text-white' : ''}`}>


          {/* User posts  */}
          <div className='grid grid-cols-1 max-sm:px-10 pb-10'>

            {userData?.userPost?.length > 0 ? (

              <>

                {userData?.userPost?.map((post) => (
                  <>
                    <div className='cursor-pointer pb-5' onClick={() => navigate(`/posts/post/${post._id}`)}>
                      <article
                        class="hover:animate-background  rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
                      >
                        <div className={`rounded-[10px] p-4 !pt-[5em] sm:p-6 ${theme ? "bg-black" : "bg-white"}`}>
                          <time class={`block text-xs ${theme ? "text-white" : "text-gray-400"}`}>{new Date(post.updatedAt).toLocaleDateString()}</time>

                          <a href="#">
                            <h3 class={`mt-0.5 text-lg font-medium ${theme ? "text-white" : "text-gray-400"}`}>
                              {post.title}
                            </h3>
                          </a>

                          {post.categories.length > 0 && (post.categories?.map((i) =>
                            <div class="mt-4 flex flex-wrap gap-1">
                              <span
                                class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
                              >
                                {i}
                              </span>


                            </div>

                          ))}


                        </div>
                      </article>
                    </div>
                  </>
                ))}
              </>
            ) : renderNoPostsMessage()}


          </div>

          {followerData?.followers?.length > 0 && (
            <div className="w-full md:w-1/2 mt-5 md:mt-0">
              <h1 className='font-semibold text-xl max-sm:px-5 md:flex md:justify-end'>Recent followers</h1>
              <div className="mt-5 max-sm:px-5 pb-9 md:float-end">
                {followerData?.followers?.slice(startIndex, endIndex).map((followingUser) => (
                  <div key={followingUser._id} className="flex pb-4 items-center justify-between gap-3 cursor-pointer" onClick={() => navigate(`/profile/${followingUser._id}`)}>
                    <div className='flex items-center gap-3'>
                      <img src={followingUser.profilePhoto?.url ?? avatar} className='w-10 h-10 object-cover rounded-full' alt='' />
                      <p className='font-semibold '>{followingUser.username}</p>
                    </div>
                  </div>
                ))}
                {/* Pagination */}
                {followerData?.followers?.length > 5 && (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                      onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                      disabled={currentPage === 1}
                      className={`${theme ? "text-white" : "text-black"} border rounded-md px-5 py-1 font-semibold`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                      disabled={endIndex >= followerData?.followers?.length}
                      className={`${theme ? "text-white" : "text-black"} border rounded-md px-5 py-1 font-semibold`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {followerData?.followers?.length === 0 && renderNoFollowersMessage()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
