import * as React from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import RequestFactory from "@utils/Request";

interface AddTodoProps {
	updateTodos: () => void;
}

export default function AddTodo(props: AddTodoProps) {
	const [fields, setFields] = React.useState({ task: "", description: "" });

	const handleChange = (e: any) => {
		setFields((state) => ({ ...state, [e.target.name]: e.target.value }));
	};

	const handleAdd = async () => {
		await RequestFactory.post(fields);
		props.updateTodos();
		setFields({ task: "", description: "" });
	};

	return (
		<Paper
			className="card"
			sx={{ padding: "1rem", marginTop: "3rem", borderRadius: 5 }}>
			<Box>
				<Typography variant="h5" marginBottom={2}>
					Add a Task
				</Typography>
				<Grid container alignItems="center" spacing={1}>
					<Grid item xs={12} md={6}>
						<TextField
							name="task"
							label="Task Name"
							variant="outlined"
							color="secondary"
							fullWidth
							value={fields.task}
							onChange={handleChange}
							autoComplete="off"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							name="description"
							label="Task Description"
							variant="outlined"
							color="secondary"
							fullWidth
							value={fields.description}
							onChange={handleChange}
							autoComplete="off"
						/>
					</Grid>
				</Grid>
				<Box marginTop={1}>
					<Button variant="contained" color="success" onClick={handleAdd}>
						Add
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
