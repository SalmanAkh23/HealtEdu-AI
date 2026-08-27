"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Camera,
  Flame,
  GraduationCap,
  Mail,
  Pencil,
  Save,
  ShieldCheck,
  Trophy,
  User,
  X,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

const supabase = createClient();


interface Stats {
  modulesCompleted: number;
  quizzesCompleted: number;
  achievements: number;
  bookmarks: number;
}

function calculateLevel(xp: number) {
  if (xp >= 2000) return 5;
  if (xp >= 1000) return 4;
  if (xp >= 500) return 3;
  if (xp >= 250) return 2;
  return 1;
}

function getLevelName(level: number) {
  const levels: Record<number, string> = {
    1: "Health Explorer",
    2: "Health Learner",
    3: "Health Builder",
    4: "Health Champion",
    5: "Health Master",
  };

  return levels[level] ?? "Health Explorer";
}

function getXPProgress(xp: number, level: number) {
  const requirements = [0, 250, 500, 1000, 2000, 3000];

  const currentLevelXP = requirements[level - 1] ?? 0;
  const nextLevelXP = requirements[level] ?? currentLevelXP + 1000;

  if (level >= 5) return 100;

  return Math.min(
    100,
    Math.max(0, ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100),
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [email, setEmail] = useState("");

  const [stats, setStats] = useState<Stats>({
    modulesCompleted: 0,
    quizzesCompleted: 0,
    achievements: 0,
    bookmarks: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    bio: "",
    date_of_birth: "",
  });

  async function loadStats(userId: string) {
    const [modulesResult, quizzesResult, achievementsResult, bookmarksResult] =
      await Promise.all([
        supabase
          .from("learning_progress")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId)
          .eq("status", "completed"),

        supabase
          .from("quiz_results")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId),

        supabase
          .from("user_achievements")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId),

        supabase
          .from("bookmarks")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId),
      ]);

    setStats({
      modulesCompleted: modulesResult.count ?? 0,
      quizzesCompleted: quizzesResult.count ?? 0,
      achievements: achievementsResult.count ?? 0,
      bookmarks: bookmarksResult.count ?? 0,
    });
  }

  async function loadProfile() {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Auth error:", userError);
        setFeedback({ type: "error", message: "Sesi login tidak dapat diperiksa. Silakan login kembali." });
        return;
      }

      if (!user) {
        setFeedback({ type: "error", message: "Sesi login tidak ditemukan. Silakan login kembali." });
        return;
      }

      setEmail(user.email ?? "");

      const { data: initialData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      let data = initialData;

      if (error) {
        console.error("Failed to load profile:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        return;
      }

      if (!data) {
        const { data: createdProfile, error: createError } = await supabase
          .from("profiles")
          .insert({ id: user.id, full_name: user.user_metadata?.full_name ?? "" })
          .select()
          .single();

        if (createError) {
          console.error("Failed to create profile:", createError);
          setFeedback({ type: "error", message: "Profile belum tersedia dan gagal dibuat." });
          return;
        }

        data = createdProfile;
      }

      const profileData = data as Profile | null;

      if (!profileData) return;

      setProfile(profileData);

      setForm({
        full_name: profileData.full_name ?? "",
        username: profileData.username ?? "",
        bio: profileData.bio ?? "",
        date_of_birth: profileData.date_of_birth ?? "",
      });

      await loadStats(user.id);
    } catch (error) {
      console.error("Profile loading error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadProfile();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave() {
    if (!profile) return;

    try {
      setIsSaving(true);

      const profileUpdate: Partial<Profile> = {
        full_name: form.full_name.trim() || null,
        username: form.username.trim() || null,
        bio: form.bio.trim() || null,
        date_of_birth: form.date_of_birth || null,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("profiles")
        .update(profileUpdate)
        .eq("id", profile.id)
        .select()
        .single();

      if (error) {
        console.error("Profile update error:", error);
        alert(`Gagal memperbarui profil: ${error.message}`);
        return;
      }

      setProfile(data as Profile);
      setIsEditing(false);
      setFeedback({ type: "success", message: "Terima kasih, perubahan profile kamu sudah tersimpan." });
    } catch (error) {
      console.error(error);
      setFeedback({ type: "error", message: "Terjadi kesalahan saat memperbarui profile." });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAvatarUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    try {
      if (!profile) return;

      const file = event.target.files?.[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setFeedback({ type: "error", message: "File harus berupa gambar." });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setFeedback({ type: "error", message: "Ukuran gambar maksimal 2MB." });
        return;
      }

      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

      const filePath = `${profile.id}/avatar.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error(uploadError);
        setFeedback({ type: "error", message: `Upload foto gagal: ${uploadError.message}` });
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const avatarUrl = `${data.publicUrl}?t=${Date.now()}`;
      const avatarUpdate: Partial<Profile> = {
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from("profiles")
        .update(avatarUpdate)
        .eq("id", profile.id);
      if (updateError) {
        console.error(updateError);
        setFeedback({ type: "error", message: `Foto berhasil diupload tetapi gagal disimpan: ${updateError.message}` });
        return;
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              avatar_url: avatarUrl,
            }
          : prev,
      );
      setFeedback({ type: "success", message: "Terima kasih, foto profile kamu sudah tersimpan." });
    } catch (error) {
      console.error(error);
      setFeedback({ type: "error", message: "Gagal mengupload foto profile." });
    } finally {
      event.target.value = "";
    }
  }

  if (isLoading) {
    return (
      <AppShell title="Profile">
        <div className="profile-page">
          <div className="profile-loading-card" />
          <div className="profile-loading-card" />
        </div>
      </AppShell>
    );
  }

  if (!profile) {
    return (
      <AppShell title="Profile">
        <div className="profile-empty">
          <User size={48} />
          <h2>Profile tidak ditemukan</h2>
          <p>Silakan login kembali untuk mengakses profile.</p>
        </div>
      </AppShell>
    );
  }

  const xp = profile.total_xp ?? 0;
  const currentStreak = profile.current_streak ?? 0;
  const longestStreak = profile.longest_streak ?? 0;

  const level = calculateLevel(xp);
  const levelName = getLevelName(level);
  const xpProgress = getXPProgress(xp, level);

  const initials =
    profile.full_name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "HE";

  return (
    <AppShell title="Profile">
      <div className="profile-page">
        {feedback && (
          <div
            role={feedback.type === "error" ? "alert" : "status"}
            style={{
              marginBottom: "1rem",
              padding: "0.875rem 1rem",
              borderRadius: 12,
              color: feedback.type === "error" ? "#b91c1c" : "#166534",
              background: feedback.type === "error" ? "#fef2f2" : "#f0fdf4",
              border: `1px solid ${feedback.type === "error" ? "#fecaca" : "#bbf7d0"}`,
            }}
          >
            {feedback.message}
          </div>
        )}

        {/* Hero */}
        <section className="profile-hero">
          <div className="profile-hero-content">
            <div className="profile-avatar-wrapper">
              {profile.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name || "Profile"}
                  className="profile-avatar"
                  width={96}
                  height={96}
                  unoptimized
                />
              ) : (
                <div className="profile-avatar profile-avatar-placeholder">
                  {initials}
                </div>
              )}

              <label
                htmlFor="avatar-upload"
                className="profile-avatar-upload"
                title="Ganti foto profile"
              >
                <Camera size={16} />
              </label>

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarUpload}
              />
            </div>

            <div className="profile-identity">
              <div className="profile-level-badge">
                <Trophy size={14} />
                Level {level}
              </div>

              <h1>{profile.full_name || "HealthEdu User"}</h1>

              {profile.username && (
                <p className="profile-username">@{profile.username}</p>
              )}

              <p className="profile-bio">
                {profile.bio ||
                  "Keep learning, build healthy habits, and grow your health knowledge."}
              </p>

              <div className="profile-email">
                <Mail size={15} />
                {email}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary profile-edit-button"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="profile-stats-grid">
          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <Trophy size={20} />
            </div>

            <div>
              <span>Total XP</span>
              <strong>{xp.toLocaleString()}</strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <Flame size={20} />
            </div>

            <div>
              <span>Current Streak</span>
              <strong>{currentStreak} days</strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <GraduationCap size={20} />
            </div>

            <div>
              <span>Modules</span>
              <strong>{stats.modulesCompleted}</strong>
            </div>
          </div>

          <div className="profile-stat-card">
            <div className="profile-stat-icon">
              <Award size={20} />
            </div>

            <div>
              <span>Achievements</span>
              <strong>{stats.achievements}</strong>
            </div>
          </div>
        </section>

        {/* Main */}
        <section className="profile-content-grid">
          <div className="profile-main-column">
            {/* Level */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <span className="profile-card-eyebrow">Learning Level</span>

                  <h2>{levelName}</h2>
                </div>

                <div className="profile-xp">{xp.toLocaleString()} XP</div>
              </div>

              <div className="profile-progress-track">
                <div
                  className="profile-progress-fill"
                  style={{
                    width: `${xpProgress}%`,
                  }}
                />
              </div>

              <div className="profile-progress-meta">
                <span>Level {level}</span>

                <span>{level >= 5 ? "MAX" : `${Math.round(xpProgress)}%`}</span>

                <span>{level >= 5 ? "Master" : `Level ${level + 1}`}</span>
              </div>
            </div>

            {/* Learning */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <span className="profile-card-eyebrow">
                    Learning Overview
                  </span>

                  <h2>Your Progress</h2>
                </div>
              </div>

              <div className="profile-learning-grid">
                <div className="profile-learning-item">
                  <BookOpen size={22} />

                  <div>
                    <strong>{stats.bookmarks}</strong>
                    <span>Saved Articles</span>
                  </div>
                </div>

                <div className="profile-learning-item">
                  <GraduationCap size={22} />

                  <div>
                    <strong>{stats.modulesCompleted}</strong>
                    <span>Modules Completed</span>
                  </div>
                </div>

                <div className="profile-learning-item">
                  <ShieldCheck size={22} />

                  <div>
                    <strong>{stats.quizzesCompleted}</strong>
                    <span>Quizzes Completed</span>
                  </div>
                </div>

                <div className="profile-learning-item">
                  <Award size={22} />

                  <div>
                    <strong>{stats.achievements}</strong>
                    <span>Achievements</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Streak */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <span className="profile-card-eyebrow">Consistency</span>

                  <h2>Learning Streak</h2>
                </div>

                <Flame size={24} />
              </div>

              <div className="profile-streak-grid">
                <div>
                  <strong>{currentStreak}</strong>
                  <span>Current Streak</span>
                </div>

                <div>
                  <strong>{longestStreak}</strong>
                  <span>Longest Streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Account */}
          <aside className="profile-side-column">
            <div className="profile-card">
              <div className="profile-card-header">
                <div>
                  <span className="profile-card-eyebrow">Account</span>

                  <h2>Profile Information</h2>
                </div>
              </div>

              <div className="profile-info-list">
                <div className="profile-info-row">
                  <span>Full Name</span>
                  <strong>{profile.full_name || "-"}</strong>
                </div>

                <div className="profile-info-row">
                  <span>Username</span>
                  <strong>
                    {profile.username ? `@${profile.username}` : "-"}
                  </strong>
                </div>

                <div className="profile-info-row">
                  <span>Email</span>
                  <strong>{email || "-"}</strong>
                </div>

                <div className="profile-info-row">
                  <span>Learning Level</span>
                  <strong>{levelName}</strong>
                </div>

                <div className="profile-info-row">
                  <span>Date of Birth</span>
                  <strong>{profile.date_of_birth || "-"}</strong>
                </div>

                <div className="profile-info-row">
                  <span>Member Since</span>
                  <strong>
                    {profile.created_at
                      ? new Date(profile.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "-"}
                  </strong>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* Edit Modal */}
        {isEditing && (
          <div className="profile-modal-backdrop">
            <div className="profile-modal">
              <div className="profile-modal-header">
                <div>
                  <span className="profile-card-eyebrow">Settings</span>

                  <h2>Edit Profile</h2>
                </div>

                <button
                  type="button"
                  className="profile-modal-close"
                  onClick={() => setIsEditing(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="profile-form">
                <div className="profile-form-field">
                  <label htmlFor="full_name">Full Name</label>

                  <input
                    id="full_name"
                    value={form.full_name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        full_name: event.target.value,
                      })
                    }
                    placeholder="Nama lengkap"
                  />
                </div>

                <div className="profile-form-field">
                  <label htmlFor="username">Username</label>

                  <input
                    id="username"
                    value={form.username}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        username: event.target.value,
                      })
                    }
                    placeholder="username"
                  />
                </div>

                <div className="profile-form-field">
                  <label htmlFor="bio">Bio</label>

                  <textarea
                    id="bio"
                    rows={4}
                    value={form.bio}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        bio: event.target.value,
                      })
                    }
                    placeholder="Ceritakan sedikit tentang diri kamu..."
                  />
                </div>

                <div className="profile-form-field">
                  <label htmlFor="date_of_birth">Date of Birth</label>

                  <input
                    id="date_of_birth"
                    type="date"
                    value={form.date_of_birth}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        date_of_birth: event.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="profile-modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save size={17} />

                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
