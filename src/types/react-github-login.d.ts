declare module "react-github-login" {

    import { ReactNode } from "react"

    interface SuccessData{
        code: string;
        [key: string]: string;
    }

    interface ReactGithubLoginProps {
        clientId: string,
        redirectUri: string,
        buttonText?: string,
        children?: ReactNode,
        className?: string,
        onRequest?: () => void,
        onSuccess?: (data: SuccessData) => void,
        onFailure?: (error: Error) => void,
        scope?: string,
    }

    declare class ReactGithubLogin extends React.Component<ReactGithubLoginProps, unknown> {}


    export default ReactGithubLogin;
}
