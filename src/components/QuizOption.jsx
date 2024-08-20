"use client";

function QuizOption({
  option,
  selectedOptions,
  handleOptionChange,
  getBackgroundColor,
}) {
  const isChecked = selectedOptions.includes(option.id);

  return (
    <div
      className={`flex items-center border w-full p-2 mb-2 cursor-pointer ${getBackgroundColor(
        option.id
      )}`}
      onClick={() => handleOptionChange(option.id)}
    >
      <input
        type="checkbox"
        id={option.id}
        checked={isChecked}
        onChange={() => handleOptionChange(option.id)}
        className="hidden" // Ocultar el checkbox real
      />
      <label htmlFor={option.id} className="flex items-center">
        <span className="mr-4">{option.text}</span>
      </label>
    </div>
  );
}

export default QuizOption;
