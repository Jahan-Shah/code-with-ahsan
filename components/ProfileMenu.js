import React from 'react'

import { getAuth } from 'firebase/auth'
import { getApp } from 'firebase/app'
import { useEffect, useState } from 'react'
import { logIn } from '../services/AuthService'

const ProfileMenu = () => {
  const auth = getAuth(getApp())
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
    })

    return () => {
      unsub()
    }
  })
  const toggleDropDown = (e) => {
    if (e) {
      e.stopPropagation()
    }
    const menu = document.querySelector('.profile-dd')
    if (menu.classList.contains('profile-dd--hidden')) {
      menu.classList.replace('profile-dd--hidden', 'profile-dd--shown')
    } else {
      menu.classList.replace('profile-dd--shown', 'profile-dd--hidden')
    }
  }
  if (!currentUser) {
    return (
      <button
        aria-label="Login Button"
        onClick={() => logIn()}
        className="overflow-hidden mx-4 relative w-10 h-10 bg-gray-100 border border-gray-500 dark:border-transparent rounded-full dark:bg-gray-600"
      >
        <svg
          className="absolute top-0 -left-1 w-12 h-12 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    )
  }

  return (
    <div
      onClick={toggleDropDown}
      role="button"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') {
          return
        }
        toggleDropDown()
      }}
      className="profile-dd profile-dd--hidden flex justify-center items-center select-none"
    >
      <div className="flex justify-center items-center">
        <div className="relative profile-dd__inner border-b-4 border-transparent py-0.5 transform transition duration-300">
          <div className="flex px-4 justify-center items-center space-x-2 cursor-pointer">
            <div className="w-12 h-12 block rounded-full overflow-hidden">
              <img
                src={currentUser?.photoURL}
                alt={currentUser?.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down transition-all ease-linear duration-100"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div className="profile-dd__inner__menu hidden absolute right-0 w-28 px-2 py-2 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-3">
            <ul className="space-y-3 dark:text-white">
              <li className="font-medium">
                <button
                  onClick={() => {
                    auth.signOut()
                  }}
                  className="w-full flex items-center text-sm transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-600"
                >
                  <div className=" text-indigo-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex-1">Logout</div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileMenu
