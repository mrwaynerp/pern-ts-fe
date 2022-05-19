function Request() {
	return {
		get: (path: string) => {
			return new Promise((resolve, reject) => {
				fetch(path)
					.then((data) => data.json())
					.then((data) => resolve(data))
					.catch((err) => reject(err));
			});
		},
		post: (data: any) => {
			return new Promise((resolve, reject) => {
				const config = {
					method: "post",
					headers: {
						"Content-Type": " application/json",
					},
					body: JSON.stringify(data),
				};
				fetch(`http://localhost:4000/todos`, config)
					.then((data) => data.json())
					.then((data) => resolve(data))
					.catch((err) => reject(err));
			});
		},
		put: (data: any) => {
			return new Promise((resolve, reject) => {
				const config = {
					method: "put",
					headers: {
						"Content-Type": " application/json",
					},
					body: JSON.stringify(data),
				};
				fetch(`http://localhost:4000/todos/${data.todo_id}`, config)
					.then((data) => data.text())
					.then((data) => resolve(data))
					.catch((err) => reject(err));
			});
		},
	};
}

export default new (Request as any)();
