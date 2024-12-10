import { useState } from 'react';

export default function RulesBlock({
  options,
  themeIndex,
  theme,
}: {
  options: string[];
  themeIndex: string;
  theme: string;
}) {
  const tooMuchOptions = options.length > 5;

  const [showMore, setShowMore] = useState(!tooMuchOptions);

  return (
    <div className="flex w-3/4 flex-col items-center p-6 px-12 md:items-start">
      <h2 className={`mb-2 ml-2 text-xl font-semibold`}>{`${themeIndex}. ${theme}`}</h2>
      {!showMore
        ? options
            .slice(0, 5)
            .map((option, optionIndex) => (
              <span
                className={``}
                key={optionIndex}
              >{`${themeIndex}.${optionIndex + 1} ${option}`}</span>
            ))
        : options.map((option, optionIndex) => (
            <span
              className={``}
              key={optionIndex}
            >{`${themeIndex}.${optionIndex + 1} ${option}`}</span>
          ))}

      {tooMuchOptions && (
        <div
          onClick={() => setShowMore(!showMore)}
          className={`ml-2 mt-2 font-semibold hover:cursor-pointer`}
        >
          {!showMore ? `Відкрити повністю >>` : `Сховати <<`}
        </div>
      )}
    </div>
  );
}
