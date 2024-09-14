import React from 'react'

export function Team() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-2 mt-12 mb-20 lg:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
            People who made it successful
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam reiciendis a vel error
            explicabo voluptatum nihil possimus veritatis eos culpa.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:mt-16 lg:gap-x-12">
          <div>
            <img
              className="h-[300px] w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-[300px] w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-[300px] w-full rounded-md object-cover"
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="mt-8 text-center md:mt-16">
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Join Our Team
          </button>
        </div>
      </div>
    </section>
  )
}
