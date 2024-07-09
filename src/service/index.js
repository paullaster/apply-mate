import { Request } from "@brainspore/transport";
import { BASEAPIURL } from "@/environment"
import AuthService from "@/packages/auth/AuthService";

const _request = new Request(AuthService, BASEAPIURL);
export  { _request };