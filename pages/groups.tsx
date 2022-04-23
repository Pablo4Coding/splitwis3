import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Link href="group-eth">
      <div className=" mt-8 max-w-2xl mx-auto cursor-pointer">
        <div className="p-2 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              <li>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-40 rounded-full h-30"
                      src="https://miro.medium.com/max/3150/1*fHerDrCZy-D9W787CboY8Q.png"
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-bold text-gray-900 mb-3">
                      ETH Amsterdam Hackathon
                    </p>
                    <p className="text-md text-gray-500 dark:text-gray-400">
                      Welcome to the ETH Amsterdam Hackathon group expenses.
                      <br />
                      <br />
                      You can use this group to track your expenses and it will settle it up for you.
                      Enjouy hacking, we will take care of your expenses.
                    </p>
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
