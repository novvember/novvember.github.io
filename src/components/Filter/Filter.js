import Checkbox from '../Checkbox/Checkbox';
import './Filter.css';

function Filter({ values, onChange }) {
  return (
    <div className="filter">
      <Checkbox
        titleOnTrue="Показать всё"
        titleOnFalse="Показать только важное"
        name="onlyImportant"
        value={values.onlyImportant}
        onChange={onChange}
      />
    </div>
  );
}

export default Filter;
