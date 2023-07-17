import { CodePipelineClient, GetPipelineStateCommand, ListPipelinesCommand } from "@aws-sdk/client-codepipeline";



export const getPipelineState = async (pipelineName:string) => {
  const client = new CodePipelineClient({region: 'ap-northeast-1'});
  const command = new GetPipelineStateCommand({ 
    name: pipelineName,
  });
  return client.send(command);
}


export const getCodePipeline = async () => {
	const client =  new CodePipelineClient({region: 'ap-northeast-1'});
  const command = new ListPipelinesCommand({});
  return client.send(command);
}

