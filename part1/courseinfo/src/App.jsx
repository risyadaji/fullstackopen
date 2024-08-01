const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercise}
    </p>
  );
};

const Content = ({ parts, age }) => {
  return (
    <>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of execersices{" "}
      {parts[0].exercise + parts[1].exercise + parts[2].exercise}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    age: 10,
    parts: [
      {
        name: "Fundamentals of React",
        exercise: 10,
      },
      {
        name: "Using props to pass data",
        exercise: 7,
      },
      {
        name: "State of a component",
        exercise: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} age={course.age} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
