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

export type IMyself = {
  like_to_you_count: number;
  need_continue_request: boolean;
  new_like_to_you_count: number;
  server_time: string;
  users: IUser[];
};

// todo
export type IZodiac = 'capricornus' | string;
export type IInterests = 'detectives' | 'coffee' | 'music_lover' | string;
export type ISports = 'keep_in_shape' | string;
export type IDatingTarget = 'serious_date' | string;
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
  form: {
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
  form_extension: {
    // todo
    artists: any[];
  };
  extra: {
    // понять в чем измеряется
    distance: number;
    hash: string;
    meta: string;
  };
  zodiac_sign_id: IZodiac;
};

export type IDates = {
  // 100, обнуляется каждый день
  // тратится при лайках
  remaining: number;
  server_time: string;
  users: IDateUser[];
};
