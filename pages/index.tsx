import type { NextPage } from 'next';
import Image from 'next/image';

const PoweredBy = () => {
  return (
    <div>
      PoweredBy &#128293;
      <div className="flex items-center justify-center gap-2">
        <div>
          <Image src="/the-graph-logo.png" height={170} width={300} alt="the graph" />
        </div>
        <div>
          <Image src="/wallet-connect-logo.png" height={170} width={300} alt="wallet connect" />
        </div>
        <div>
          <Image src="/polygon-logo.png" height={170} width={300} alt="polygon" />
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen font-medium text-primary">
      <h1 className="w-full mb-5 text-5xl font-bold text-center">SplitConnect</h1>
      <PoweredBy />
    </div>
  );
};

export default Home;
