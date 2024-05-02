import PropTypes from "prop-types";

const AuthInput = ({
  fieldSetter,
  labelName,
  id,
  type,
  additionalBlock,
  additionalBlockLink,
  autoComplete,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-50"
        >
          {labelName}
        </label>
        {additionalBlock ? (
          <div className="text-sm">
            <a
              href={additionalBlockLink}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {additionalBlock}
            </a>
          </div>
        ) : null}
      </div>
      <div className="mt-2">
        <input
          onChange={(e) => fieldSetter(e.target.value)}
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete ? autoComplete : type}
          required
          className="block w-full rounded-md border-0 py-1.5 p-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

AuthInput.propTypes = {
  fieldSetter: PropTypes.func.isRequired,
  labelName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  additionalBlock: PropTypes.string,
  additionalBlockLink: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default AuthInput;
