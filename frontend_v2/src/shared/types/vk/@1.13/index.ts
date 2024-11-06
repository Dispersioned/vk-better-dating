import type { DateString, ServerTime, UnidentifiedStringEnum, UnknownType } from "../../utility"


export interface AuthSignInResponse {
  client_features: {
    'part_enabled.miniapp_recommend': boolean
    'part_enabled.notification_channels': boolean
    'part_enabled.nps': boolean
    'part_enabled.validate_profile_fields': boolean
  }
  is_service_panel_enabled: boolean
  report_info: {
    bad_fields: UnknownType[]
    bad_stories: UnknownType[]
    block_expires_at: DateString
    not_filled_details: UnknownType[]
  }
  server_time: ServerTime
  stream_args: string //TODO выяснить зачем
  token: string
  verification_info: {
    next_attempt_at: DateString
    status: UnidentifiedStringEnum
    verification_pose_id: UnidentifiedStringEnum
  }
}