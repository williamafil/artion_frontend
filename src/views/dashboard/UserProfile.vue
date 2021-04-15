<template>
  <div>
    <main class="flex-1 overflow-x-hidden overflow-y-auto">
      <div class="container mx-auto px-6 py-8">
        <h3 class="text-gray-700 text-center text-2xl font-base">更換頭像</h3>

        <div class="max-w-3xl mx-auto px-4 py-10">

            <div class="mb-5 text-center">
              <div class="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                <img
                  id="image"
                  class="object-cover w-full h-32 rounded-full"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  alt="user's avatar"
                />
              </div>
              <!-- <h3 class="mb-4">{userName}</h3> -->

              <label
                htmlFor="profile-photo-input"
                type="button"
                class="cursor-pointer inine-flex justify-between items-center
                focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left
                text-gray-600 bg-white hover:bg-gray-100 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                    stroke="none"
                  ></rect>
                  <path
                    d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1
                    1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2
                    2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                瀏覽照片
              </label>

              <div class="mx-auto w-48 text-gray-500 text-xs text-center mt-1">
                點擊並更換頭像
              </div>

              <input
                type="file"
                id="profile-photo-input"
                name="profile_picture"
                class="hidden"
                accept="image/png, image/jpeg"
              />
            </div>

        </div>
      </div>

      <div class="flex items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div class="container mx-auto">
          <div class="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
            <div class="text-center">
              <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Contact Us</h1>
              <p class="text-gray-400 dark:text-gray-400">Fill up the form below to send us a message.</p>
            </div>
            <div class="m-7">
              <form action="https://api.web3forms.com/submit" method="POST" id="form">
                <input type="hidden" name="apikey" value="YOUR_ACCESS_KEY_HERE">
                <input type="hidden" name="subject" value="New Submission from Web3Forms">
                <input type="checkbox" name="botcheck" id="" style="display: none;">

                <div class="mb-6">
                  <label for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    required
                    class="w-full px-3 py-2 placeholder-gray-300 border
                        border-gray-300 rounded-md focus:outline-none focus:ring
                        focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700
                        dark:text-white dark:placeholder-gray-500 dark:border-gray-600
                        dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                </div>
                <div class="mb-6">
                  <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    required
                    class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300
                          rounded-md focus:outline-none focus:ring focus:ring-indigo-100
                          focus:border-indigo-300 dark:bg-gray-700 dark:text-white
                          dark:placeholder-gray-500 dark:border-gray-600
                          dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                </div>
                <div class="mb-6">

                  <label for="phone" class="text-sm text-gray-600 dark:text-gray-400">Phone Number</label>
                  <input type="text" name="phone" id="phone" placeholder="+1 (555) 1234-567" required class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                </div>
                <div class="mb-6">
                    <label for="message" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Your Message</label>

                    <textarea rows="5" name="message" id="message" placeholder="Your Message" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" required></textarea>
                </div>
                <div class="mb-6">
                    <button type="submit" class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Send Message</button>
                </div>
                <p class="text-base text-center text-gray-400" id="result">
                </p>
              </form>
            </div>
        </div>
    </div>
  </div>
    </main>
  </div>
</template>
