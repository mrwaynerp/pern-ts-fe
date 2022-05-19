import React from "react";
import { Box, Typography, Button } from "@mui/material";
import useFetch from "@hooks/useFetch";
import RequestFactory from "@utils/Request";
import Todos from "@components/Todos";
import AddTodo from "@components/AddTodo";

const URI = "http://localhost:4000/todos";

function App() {
	const [todos, setTodos] = React.useState<Array<Object>>([]);
	const { status, data } = useFetch(URI);

	React.useEffect(() => {
		setTodos(data);
	}, [data]);

	const fetchTodos = () => {
		RequestFactory.get(URI).then((data: Object[]) => setTodos(data));
	};

	return (
		<div className="app">
			<Typography variant="h5">PERN Todo App with TypeScript</Typography>

			<Box>
				<Typography variant="subtitle1">
					{`Todos ${status}: ${data.length}`}
				</Typography>
				<Button
					variant="outlined"
					color="primary"
					onClick={fetchTodos}
					size="small">
					Refresh
				</Button>
			</Box>

			<AddTodo updateTodos={fetchTodos} />

			<Todos data={todos} setTodos={setTodos} />
		</div>
	);
}

export default App;
