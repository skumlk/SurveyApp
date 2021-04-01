// import axios from "axios"
import { useMutation, useQuery } from "react-query";
import { getAuthToken } from "../helpers/authHelpers";
import { axiosInstance } from "../helpers/axiosHelper";

const useSurveyItem = function (surveyId, options = {}) {
    const { data: surveyItem } = useQuery({
        queryKey: ['survey', { surveyId }],
        queryFn: () => {
            return axiosInstance.get(`survey/view/${surveyId}`)
                .then((result) => {
                    const data = result.data
                    if (data.success) {
                        return data.data
                    }
                })
        },
        ...options,
        config: {
            ...options.config,
        },
    })

    return surveyItem ?? {}
}

const useSurveyItems = function (options = {}) {

    const { data: surveyItems } = useQuery({
        queryKey: 'survey-items',
        queryFn: () => {
            return axiosInstance.get("survey/view/all")
                .then((result) => {
                    const data = result.data
                    if (data.success) {
                        return data.data
                    }
                })
        },
        ...options,
        config: {
            ...options.config,
            onSuccess: async surveyItems => {
                await options.config?.onSuccess?.(surveyItems)
                for (const surveyItem of surveyItems) {
                    // setQueryDataForBook(listItem.book)
                }
            },
        },
    })

    return surveyItems ?? []
}

const useCreateSurvey = function () {
    return useMutation(({ title, description }) => {
        const data = { title, description }
        console.log(data)
        return axiosInstance.post("survey/create", data)
            .then((result) => {
                const data = result.data
                if (data.success) {
                    return data.data
                }
            })
    });
}

export { useCreateSurvey, useSurveyItems, useSurveyItem }
// export { useSuuseCreateSurveyrvey }