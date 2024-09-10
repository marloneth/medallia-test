import "./PeopleList.css";

export default function PeopleList({
  title = "People List",
  items = [],
  itemKey = "person-item",
}) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {items.map((item, i) => (
          <li key={`${itemKey}-${i + 1}`} className="list-item">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
