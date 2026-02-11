const STORAGE_KEYS = {
  STORIES: "whatif_stories",
  CHOICE_COUNTS: "whatif_choice_counts",
  USER_VALUES: "whatif_user_values",
  DIARY: "whatif_diary",
} as const;

export interface StoredStory {
  id: string;
  choice: string;
  subChoice?: string;
  story: unknown;
  createdAt: string;
  timelineResponses?: Record<number, "sim" | "nao" | "nao_sei">;
  reflectionAnswers?: Record<number, string>;
  aiProvider?: string;
  model?: string | null;
  offlineFallback?: boolean;
}

export function saveStory(story: StoredStory): void {
  if (typeof window === "undefined") return;
  const stories = getStoredStories();
  const filtered = stories.filter((s) => s.id !== story.id);
  filtered.unshift(story);
  localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(filtered.slice(0, 50)));
}

export function getStoredStories(): StoredStory[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STORIES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getStoryById(id: string): StoredStory | null {
  return getStoredStories().find((s) => s.id === id) ?? null;
}

export function updateStoryResponses(
  id: string,
  timelineResponses: Record<number, "sim" | "nao" | "nao_sei">
): void {
  const stories = getStoredStories();
  const index = stories.findIndex((s) => s.id === id);
  if (index >= 0) {
    stories[index].timelineResponses = { ...stories[index].timelineResponses, ...timelineResponses };
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  }
}

export function updateReflectionAnswers(id: string, answers: Record<number, string>): void {
  const stories = getStoredStories();
  const index = stories.findIndex((s) => s.id === id);
  if (index >= 0) {
    stories[index].reflectionAnswers = { ...stories[index].reflectionAnswers, ...answers };
    localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
  }
}

export function incrementChoiceCount(choice: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHOICE_COUNTS);
    const counts: Record<string, number> = raw ? JSON.parse(raw) : {};
    counts[choice] = (counts[choice] || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.CHOICE_COUNTS, JSON.stringify(counts));
  } catch {
    // ignore
  }
}

export function getChoiceCounts(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHOICE_COUNTS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveToDiary(entry: { id: string; title: string; date: string }): void {
  if (typeof window === "undefined") return;
  const diary = getDiary();
  diary.unshift(entry);
  localStorage.setItem(STORAGE_KEYS.DIARY, JSON.stringify(diary.slice(0, 100)));
}

export function getDiary(): { id: string; title: string; date: string }[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DIARY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
