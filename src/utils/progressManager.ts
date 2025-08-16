export interface TestProgress {
  categoryId: string;
  currentQuestionIndex: number;
  answers: string[];
  startTime: number;
  completed: boolean;
}

export interface TestResult {
  categoryId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  answers: string[];
  completedAt: number;
}

export interface StudyProgress {
  categoryId: string;
  correctAnswers: number;
  totalAnswered: number;
  lastQuestionIndex: number;
}

export interface UserStats {
  totalTestsTaken: number;
  totalPassed: number;
  averageScore: number;
  bestScore: number;
  lastTestDate?: number;
}

class ProgressManager {
  private readonly PROGRESS_KEY = 'citizenship_test_progress';
  private readonly RESULTS_KEY = 'citizenship_test_results';
  private readonly STUDY_KEY = 'citizenship_study_progress';
  private readonly STATS_KEY = 'citizenship_user_stats';

  // Test Progress Management
  saveTestProgress(progress: TestProgress): void {
    const allProgress = this.getTestProgress() as Record<string, TestProgress>;
    allProgress[progress.categoryId] = progress;
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
  }

  getTestProgress(categoryId?: string): Record<string, TestProgress> | TestProgress | null {
    const stored = localStorage.getItem(this.PROGRESS_KEY);
    if (!stored) return categoryId ? null : {};
    
    const allProgress: Record<string, TestProgress> = JSON.parse(stored);
    return categoryId ? allProgress[categoryId] || null : allProgress;
  }

  clearTestProgress(categoryId?: string): void {
    if (categoryId) {
      const allProgress = this.getTestProgress() as Record<string, TestProgress>;
      delete allProgress[categoryId];
      localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
    } else {
      localStorage.removeItem(this.PROGRESS_KEY);
    }
  }

  // Test Results Management
  saveTestResult(result: TestResult): void {
    const allResults = this.getTestResults() as Record<string, TestResult>;
    allResults[result.categoryId] = result;
    localStorage.setItem(this.RESULTS_KEY, JSON.stringify(allResults));
    
    // Update user stats
    this.updateUserStats(result);
  }

  getTestResults(categoryId?: string): Record<string, TestResult> | TestResult | null {
    const stored = localStorage.getItem(this.RESULTS_KEY);
    if (!stored) return categoryId ? null : {};
    
    const allResults: Record<string, TestResult> = JSON.parse(stored);
    return categoryId ? allResults[categoryId] || null : allResults;
  }

  // Study Progress Management
  saveStudyProgress(progress: StudyProgress): void {
    const allProgress = this.getStudyProgress() as Record<string, StudyProgress>;
    allProgress[progress.categoryId] = progress;
    localStorage.setItem(this.STUDY_KEY, JSON.stringify(allProgress));
  }

  getStudyProgress(categoryId?: string): Record<string, StudyProgress> | StudyProgress | null {
    const stored = localStorage.getItem(this.STUDY_KEY);
    if (!stored) return categoryId ? null : {};
    
    const allProgress: Record<string, StudyProgress> = JSON.parse(stored);
    return categoryId ? allProgress[categoryId] || null : allProgress;
  }

  // User Statistics
  private updateUserStats(result: TestResult): void {
    const stats = this.getUserStats();
    
    stats.totalTestsTaken++;
    if (result.passed) {
      stats.totalPassed++;
    }
    
    const percentage = (result.score / result.totalQuestions) * 100;
    stats.averageScore = (stats.averageScore * (stats.totalTestsTaken - 1) + percentage) / stats.totalTestsTaken;
    
    if (percentage > stats.bestScore) {
      stats.bestScore = percentage;
    }
    
    stats.lastTestDate = Date.now();
    
    localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
  }

  getUserStats(): UserStats {
    const stored = localStorage.getItem(this.STATS_KEY);
    if (!stored) {
      return {
        totalTestsTaken: 0,
        totalPassed: 0,
        averageScore: 0,
        bestScore: 0
      };
    }
    return JSON.parse(stored);
  }

  // Utility methods
  hasIncompleteTest(categoryId: string): boolean {
    const progress = this.getTestProgress(categoryId) as TestProgress;
    return progress !== null && !progress.completed;
  }

  getLastTestResult(categoryId: string): TestResult | null {
    return this.getTestResults(categoryId) as TestResult;
  }

  clearAllData(): void {
    localStorage.removeItem(this.PROGRESS_KEY);
    localStorage.removeItem(this.RESULTS_KEY);
    localStorage.removeItem(this.STUDY_KEY);
    localStorage.removeItem(this.STATS_KEY);
  }

  // Export/Import functionality for backup
  exportData(): string {
    const data = {
      progress: this.getTestProgress(),
      results: this.getTestResults(),
      study: this.getStudyProgress(),
      stats: this.getUserStats()
    };
    return JSON.stringify(data);
  }

  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.progress) localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(data.progress));
      if (data.results) localStorage.setItem(this.RESULTS_KEY, JSON.stringify(data.results));
      if (data.study) localStorage.setItem(this.STUDY_KEY, JSON.stringify(data.study));
      if (data.stats) localStorage.setItem(this.STATS_KEY, JSON.stringify(data.stats));
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

export const progressManager = new ProgressManager();
