const Users = () => {
  const users: string[] = [
      '0xwqshbfiwbfuwibewineuwnfi',
      '0xwqshbfiwbfuwibewineuwnff'
  ];

  return (
    <div className="flex-col">
      {users.map((user) => (
        <div className="flex justify-between items-center border-b-1 border-solid" key={user}>
          <img
            className="w-15 h-10 rounded-full mr-4"
            src="https://miro.medium.com/max/3150/1*fHerDrCZy-D9W787CboY8Q.png"
            alt="Neil image"
          />
          <div className="mr-4">{user}</div>
          <div className="text-red">Owes 150</div>
        </div>
      ))}
    </div>
  );
};

export default Users;
