// possibly null?
export type IUserSex = 'female' | 'male';

export type IUser = {
  name: string;
  sex: IUserSex;
  is_online: boolean;
  last_active_at: string;
  photo_url: string;
  extra: { hash: string };
};

export type IProfile = {
  like_to_you_count: number;
  need_continue_request: boolean;
  new_like_to_you_count: number;
  server_time: string;
  users: Array<{
    userdb?: IRecommendationUserInfo;
    user: IUser;
  }>;
};

// todo
export type IZodiac = 'leo' | 'capricornus' | string;
export type IInterests = 'detectives' | 'coffee' | 'music_lover' | string;
export type ISports = 'keep_in_shape' | string;
export type IDatingTarget = 'serious_date' | 'conversation' | 'new_experience' | undefined;
export type IFamily = 'free' | string;

type IStoryBase = {
  large_url: string;
  medium_url: string;
  small_url: string;
  blur_url: string;
  // непонятная хуйня
  media_index: string;
};

export type IStoryImage = IStoryBase & {
  type: 'photo';
};

export type IStoryVideo = IStoryBase & {
  type: 'video';
  video_large_url: string;
  video_medium_url: string;
};

export type IStory = IStoryImage | IStoryVideo;

export type IDateUserForm = {
  about: string;
  work: string;
  education: string;
  music: string;
  movies: string;
  books: string;
  // в сантиметрах
  height: number;
  sport: ISports;
  target: IDatingTarget;
  family: IFamily;
  interests: IInterests[];
  // todo
  labels: any[];
  // todo
  artists: any[];
};

export type IDateUserFormExtension = {
  // todo
  artists: {
    id: string;
    name: string;
  }[];
};

export type IDateUserExtra = {
  // понять в чем измеряется
  distance: number;
  hash: string;
  meta: string;
};

export type IDateUser = {
  // mapped id of vk.dates microservice
  id: number;
  name: string;
  sex: IUserSex;
  age: number;
  is_verify: boolean;
  is_deleted: boolean;
  is_blocked: boolean;
  is_online: boolean;
  is_premium_enabled: boolean;
  last_active_at: string;
  stories: IStory[];
  form: IDateUserForm;
  form_extension: IDateUserFormExtension;
  extra: IDateUserExtra;
  zodiac_sign_id: IZodiac;
};

export type IRecommendationUserInfo = {
  //* same as user.id
  id: number;
  user: IDateUser;
  isLiked: boolean;
  isSkipped: boolean;
};

export type IDates = {
  // 100, обнуляется каждый день
  // тратится при лайках
  remaining: number;
  server_time: string;
  users: IRecommendationUserInfo[];
};

export type IVkAuth = {
  client_features: Record<string, boolean>;
  is_position_required: boolean;
  is_service_panel_enabled: boolean;
  report_info: {
    block_expires_at: string;
    bad_stories: unknown[];
    bad_fields: unknown[];
    not_filled_details: unknown[];
  };
  server_time: string;
  stream_args: string;
  token: string;
  user: {
    id: number;
    vk_id: number;
    name: string;
    stories: IStory[];
    sex: IUserSex;
    birth: string;
    age: number;
    is_verify: boolean;
    is_profile_filled: boolean;
    is_deleted: boolean;
    is_blocked: boolean;
    is_online: boolean;
    attention_count: number;
    super_like_count: number;
    is_activated: true;
    last_active_at: string;
    fullness: number;
    time_zone_offset_seconds: number;
    forever_deleted_at: string;
    form: IDateUserForm;
    form_extension: IDateUserFormExtension;
    setting: {
      age_min: number;
      age_max: number;
      distance: number;
      sex: IUserSex;
      // todo
      purpose: 'love' | string;
      is_profile_hidden: boolean;
      is_age_hidden: boolean;
      is_distance_hidden: boolean;
      is_premium_hidden: boolean;
      is_badge_enabled: boolean;
      is_ret_widget_enabled: boolean;
    };
    zodiac_sign_id: IZodiac;
    created_at: string;
    // todo
    location_ids: unknown[];
  };
  verification_info: {
    // todo
    status: 'ready' | string;
    next_attempt_at: string;
    // todo
    verification_pose_id: 'victory' | string;
  };
};

export type IMatchInfo = {
  user: IRecommendationUserInfo;
  matchedByUrl: string;
};

export type ILikeOrDislikeResponse = {
  userId: number;
  isMatchMissed: boolean;
  date: number;
};
