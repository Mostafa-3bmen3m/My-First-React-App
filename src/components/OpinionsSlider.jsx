import React from 'react';

const OpinionsSlider = ({opinions, user}) => {

  return (
    <div className="w-full py-8 h-[70vh] flex flex-col justify-center bg-white dark:bg-black">
      <h2 className="text-2xl font-bold mb-4 text-center">What Our Users Say</h2>
      <div className="overflow-x-hidden w-full">
        <div className="opinions-marquee gap-x-8">
          {opinions.map((opinion, idx) => (
            <div
              key={idx}
              className="opinion-card"
            >
              <div className="font-bold text-lg mb-1">{opinion.name}</div>
              {opinion.username && <div className="text-xs text-gray-400 mb-1">@{opinion.username}</div>}
              <div className="text-xs text-gray-500 mb-3">{opinion.email}</div>
              <div className="text-base">{opinion.comment}</div>
            </div>
          ))}
          {opinions.map((opinion, idx) => (
            <div
              key={`dup-${idx}`}
              className="opinion-card"
            >
              <div className="font-bold text-lg mb-1">{opinion.name}</div>
              {opinion.username && <div className="text-xs text-gray-400 mb-1">@{opinion.username}</div>}
              <div className="text-xs text-gray-500 mb-3">{opinion.email}</div>
              <div className="text-base">{opinion.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpinionsSlider; 