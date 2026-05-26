function StudentCard(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Course: {props.course}</p>
            <p>Year: {props.year}</p>
        </div>
    );
}

export default StudentCard;