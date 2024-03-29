import { HTMLInputTypeAttribute, useId } from 'react';
import './rating-input.css';
import { useTranslation } from 'react-i18next';

type RatingInputProps<T> = {
  value: T;
  name: string;
};

function Star<T extends HTMLInputTypeAttribute>({
  value,
  name,
}: RatingInputProps<T>) {
  return (
    <>
      <input
        value={value}
        name={name}
        id={`${name}_star${value}`}
        type="radio"
        className="hidden"
      />
      <label
        htmlFor={`${name}_star${value}`}
        className=" float-right cursor-pointer text-primary-500 
        transition-colors duration-300 after:text-3xl after:content-['\2605'] "
      ></label>
    </>
  );
}

function GroupedStars({ name, legend }: { name: string; legend: string }) {
  const { t } = useTranslation('skill');
  const translatedLegend = t(legend.toLowerCase());

  const NB_STARS = 10;
  const MAX_VALUES = 100;
  const STEP = MAX_VALUES / NB_STARS;
  const stars = new Array(NB_STARS).fill(0);
  const id = useId();

  return (
    <fieldset name={name} className="rating flex w-fit flex-row-reverse gap-1">
      <legend className="text-sm font-semibold">{translatedLegend}</legend>
      {stars.map((_, index) => (
        <Star
          key={index + id}
          value={(MAX_VALUES - index * STEP).toString()}
          name={name}
        />
      ))}
    </fieldset>
  );
}

export default GroupedStars;
