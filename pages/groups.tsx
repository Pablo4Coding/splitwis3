import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Link href="group-eth">
      <div className="max-w-2xl mx-auto cursor-pointer">
        <div className="p-2 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              <li>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-40 h-30 rounded-full"
                      src="https://miro.medium.com/max/3150/1*fHerDrCZy-D9W787CboY8Q.png"
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                      ETH Amsterdam 2022
                    </p>
                    <p className="text-xl text-gray-500 truncate dark:text-gray-400">
                      Letsssssssgoooooooooo! 🔥
                    </p>
                  </div>
                  <div className="text-red inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    You owe 150$
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Home;
