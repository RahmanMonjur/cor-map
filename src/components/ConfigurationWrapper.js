import { useSavedObjectList } from "../services/dataStore"
import Configurations from "./Configuration";
import { useCallback, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useDataEngine } from "@dhis2/app-runtime";

export const ConfigurationWrapper = () => {
    const engine = useDataEngine()
    const { id } = useParams()
    const history = useHistory()
    const [visualizations, { add, update }] = useSavedObjectList({ noUpdate: true });
    const [savedId, setSavedId] = useState(undefined)

    const onSave = useCallback(async newVisualization => {
        if (id) {
            await update(id, newVisualization)
            setSavedId(id)
        } else {
            const result = await add(newVisualization)
            setSavedId(result.id)
        }
    }, [id, update, add])

    const onCancel = useCallback(() => {
        history.goBack()
    }, [history])

    if (savedId) {
        return <Redirect to={`/visualization/${savedId}`} />
    }

    const visualization = id ? visualizations.find(vis => vis.id === id) : undefined
    return <Configurations engine={engine} visualization={visualization} onSave={onSave} onCancel={onCancel}/>
}