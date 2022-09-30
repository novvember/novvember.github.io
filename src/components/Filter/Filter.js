import Checkbox from '../Checkbox/Checkbox';
import './Filter.css';

function Filter({ values, onChange }) {
  return (
    <form className="filter">
      <Checkbox
        titleOnTrue="Только важное!"
        titleOnFalse="Только важное?"
        name="onlyImportant"
        value={values.onlyImportant}
        onChange={onChange}
      />
    </form>
  );
}

export default Filter;
