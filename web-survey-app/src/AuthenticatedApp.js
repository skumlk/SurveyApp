
import React, { useEffect } from "react"
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import { Flex, Spacer, Heading, Button, Input, Textarea } from "@chakra-ui/react"
import { useFormik } from "formik";
import { useCreateSurvey, useSurveyItem, useSurveyItems } from "./services/survey";

function ViewAllSurveys() {
  // const { id: surveyId } = useParams();
  // const data = useSurveyItem(surveyId)
  return <div>Survey Title</div>
}

function ViewSurvey() {
  const { id: surveyId } = useParams();
  const data = useSurveyItem(surveyId)
  return <div>Survey Title: {data.title}</div>
}

function NewSurvey() {

  const cresteSurvetMutation = useCreateSurvey()
  const history = useHistory()

  const formik = useFormik({

    onSubmit: values => {
      const handleCreateSurvey = async () => {
        cresteSurvetMutation.mutate({ title: values.title, description: values.description }, {
          onSuccess: (data, variable, context) => {
            const { id } = data
            history.push(`/survey/view/${id}`)
          }
        })
      }

      handleCreateSurvey()
    },
  });

  // console.log(data, isLoading)

  return <React.Fragment>
    <div className="text-2xl font-bold">Create Survey</div>
    <form onSubmit={formik.handleSubmit} className="m-auto h-full w-full my-5">
      <div className="w-full flex-col">
        <div>
          <label htmlFor="title" className="mb-5 mr-5">Title</label>
          <Input
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-100 mb-5"
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-5 mr-5">Description</label>
          <Textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-100 mb-5"
          />
        </div>
      </div>
      <Button type="submit" className="mb-5">Create Survey</Button>
    </form>
  </React.Fragment>
}

function Home() {

  const history = useHistory()
  const surveyItems = useSurveyItems()

  function goToNewSurvey() {
    history.push("/survey/new")
  }

  function goToSurveyItem(id) {
    history.push(`/survey/view/${id}`)
  }

  // console.log(surveyItems)

  return (
    <div className="flex flex-col">
      <div>
        <Button className=" mr-4" onClick={() => goToNewSurvey()}>New Survey</Button>
      </div>
      <div className="home-survey-list mt-4">
        {surveyItems.map(item => <div className="capitalize mb-2 p-2 cursor-pointer rounded-lg" onClick={() => goToSurveyItem(item._id)}>{item.title}</div>)}
        {surveyItems.length === 0 && <div className="capitalize mb-2 p-2 cursor-pointer rounded-lg">No surveys, create one!</div>}
      </div>
    </div>
  )
}

function AuthenticatedApp() {
  return (
    <div className="mx-auto p-5" style={{ width: "1000px" }}>
      <Switch>
        <Route path="/survey/view/all" component={ViewAllSurveys} exact />
        <Route path="/survey/view/:id" component={ViewSurvey} exact />
        <Route path="/survey/new" component={NewSurvey} exact />
        <Route path="/" component={Home} exact />
      </Switch>
    </div>
  );
}

export default AuthenticatedApp;