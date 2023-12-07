# Tasks Stack

This repo houses two main packages:

1. React UI for rending tasks allowing users to create, update and delete tasks.
2. ExpressJS service for enabling CRUD actions, with a connection to mongoDB

Quick steps to get the stack running are as follows (See below for more depth)

1. Clone directory and navigate into it. All commands are run from the root of the project.
2. Run `yarn install`
3. Run `yarn build:model`
4. Run `docker compose up -d mongo`
5. Run `yarn tasksvc:build`
6. Run `yarn tasksvc:start`
7. Open up new CLI window and head to the same directory
7. Run `yarn ui:start`

If any problems occur, stop and re-clone the repo to start from fresh. Then read the following as their may be some extra
config required for your machine.

## Running The Stack

### Prerequisites

**Dependencies**

Before running any applications, ensure a `yarn install` has been performed from the root directory.

The project uses yarn workspaces to manage the packages and their dependencies. The install will wire up the packages, 
including the `libs` directory which contains the task model used by both the front and back end.

**Mongo**

The service is designed to work with mongo, as such it will need a mongo connection string in order to connect to the DB.

The db can either be run independently outside the stack or there is config provided in the [docker-compose.yml](docker-compose.yml) file
for spinning up an instance of mongo. Mongo started via `docker compose` will attempt to use port 27017. If you already have mongo
running outside of docker and still want to start up the docker version, you will need to adjust the port config to avoid overlap.

There are two approaches you can take to spin the stack up:

1. Run the UI and app manually using the package scripts
2. Using docker

### Run the UI and app manually using the package scripts

Assuming the installation has completed successfully, the next stage will be to get the front and back ends running.

Before going forward, run `yarn build:model` as this is used by both the front and back end.

**Back End**

From any directory inside the project run `yarn tasksvc:build`. If there are no errors, you should see:

![svcbuild.png](readme-resources%2Fsvcbuild.png)

After this has finished, you can now run `yarn tasksvc:start`. The output will advise which port the service is running
on and also the URL used to connect to mongo.

![svcstart.png](readme-resources%2Fsvcstart.png)

If all goes well, until you start hitting the API, there will be no further logging.

If after a few moments an exception is thrown, it's likely the service has been unable to connect to mongo. In this case,
double check that mongo is running and that the host:port provided matches what the service is expecting.

If you need to change the default mongo host:port, this can be done by providing either an env var or by editing the default
set in the code in [connection.ts](./packages/task-service/src/repository/connection.ts)

![mongoconnectionstring.png](readme-resources%2Fmongoconnectionstring.png)

**Front End**

From any directory inside the project, run `yarn ui:start` in your terminal. Vite is the build tool in use here and will take care of
spinning up the UI for you.

If successful, you should see the following output in your terminal window:

![yarn ui:start](readme-resources%2Fuistartout.png)

Open up your browser to the local url provided in the output and the UI should show. If you navigate to tasks at this point
without having already spun up the backend, you'll see a spinner present where the tasks would render.

### Using Docker

The provided [docker-compose.yml`](./docker-compose.yml) provides a preconfigured experience for accessing the stack.

Note, once spun up the UI will be accessible on port 5173, not 3000.

**Prerequisites**
- You must have docker installed.
- **If using windows, it's also recommended to configure your WSL config to ensure docker cannot be allocated too much memory and subsequently slow down your machine**
- Assumption is that you are running Compose V2 which uses syntax `docker compose` in the CLI. Deprecated Compose V1 has not been tested, evident by using `docker-compose` in the CLI.

Health checks have not been setup at this time, so the suggested approach below spins up each component separately, allowing time in between for them to start up.

1. Open up a terminal window in the root directory and run `docker compose up mongo`
2. Open up a new terminal window in the root directory and run `docker compose up tasksvc`
3. Open up a new terminal window in the root directory and run `docker compose up ui`

Reasoning for opening up a new window for each is to ensure logs are visible. But if you'd prefer to achieve in a single
window, feel free to add the detatch option `-d` before the name of each service. Logs can always be found afterwards
by doing:

- `docker compose logs <service, eg, mongo or tasksvc>` for current output
- `docker compose logs -f <service, eg, mongo or tasksvc>` for tailing

The first run for each may be slower than expected while it created the docker image. Subsequent runs will be faster
as the image creation stage won't be needed.

If changes are made to the code and you'd like to see these in the docker image, add the `--build` option to the `up`
command.

To tear down afterwards, run `docker compose down`

## Rest API

When the task service is running, the rest API is available at the following endpoint:

`http://<host>:<port>/api/tasks`

### Task Schema

See: [index.ts](libs%2Fmodel%2Fsrc%2Findex.ts)

```typescript
export type TTaskStatus = "To Do" | "In Progress" | "Complete";

export interface ITask {
  taskId?: string;
  title: string;
  assignedTo: string;
  createdDate: Date;
  dueDate?: Date;
  completedDate?: Date;
  status: TTaskStatus;
}
```

The following operations have been set up:

### /GET Tasks

Method: GET

Path: `/api/tasks`

Returns a list of tasks

Optional Query Params:
- includeCompleted -> Expects undefined, "true" or "false"
- sortBy -> Expects either undefined or <field>::<sortDirection>, eg. assignedTo::desc

### /POST Task

Method: POST

Path: `/api/tasks`

Creates a new task. Expects a task object to be passed in, returns created task with taskId

### /DELETE Task

Method: DELETE

Path: `/api/tasks/:taskId`

Deletes task matching the given taskId

### /PUT Task

Method: PUT

Path: `/api/tasks/:taskId`

Updates the task matching the given taskId with the task object provided in the payload

## Unit Testing

In the interests of time, unit tests have not been added for every function. However, if this app were to be productionsed,
this would be addressed early on with a view to achieving coverage in the region of 75-80%.

However, in the interest of providing a few notable testing approaches, the following has been achieved.

**Front End**
- UI Component Testing: See [Task.spec.tsx](packages%2Fui%2Fsrc%2Fcomponents%2Ftasks%2FTask.spec.tsx)
- UI State Testing: See [TaskState.spec.ts](packages%2Fui%2Fsrc%2Fstate%2Ftasks%2FTaskState.spec.ts), includes mocking with sinon and saga tests with redux-saga-test-plan

**Back End**
- Router Testing: See [tasks.spec.ts](packages%2Ftask-service%2Fsrc%2Fapi%2Froutes%2Ftasks.spec.ts), includes supertest with sinon