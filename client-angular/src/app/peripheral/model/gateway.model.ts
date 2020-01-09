export class GatewayModel {
  sn: string;
  name: string;
  ipv4: string;
  devices: [];
}

export interface ResponseModel{
  status: Boolean;
  data: GatewayModel[];
  message: string;
}

