import { L } from '../components/L'
import { AccessForm } from '../components/access/AccessForm'

export default function Access() {
  return (
    <main>
      <section className="wrap pt-16">
        <div className="head" data-reveal="">
          <div>
            <span className="kicker">
              <L n="sparkles" />
              Early access
            </span>
            <h1>
              {"Velum opens in waves. "}
              <em>
                Get on the list.
              </em>
            </h1>
          </div>
          <div className="flex flex-col items-start gap-5">
            <p>
              Tell us how you’d use it and we’ll send your invite.
            </p>
          </div>
        </div>
      </section>
      <div className="wrap mt-20 grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-5 max-[900px]:grid-cols-1 max-[900px]:gap-14" data-reveal="">
        <div className="folder tone-night mt-0 flex flex-col gap-3 p-7 max-[480px]:p-5">
          <span className="folder-tab">
            What happens next
          </span>
          <div className="flex items-center gap-4 rounded-[18px] bg-night-2 p-4">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-night text-pale">
              <L n="search" size={18} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="label !text-night-muted">
                Step 1
              </span>
              <span className="text-[15px] leading-snug">
                We review your request.
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 rounded-[18px] bg-night-2 p-4">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-night text-pale">
              <L n="key-round" size={18} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="label !text-night-muted">
                Step 2
              </span>
              <span className="text-[15px] leading-snug">
                You get an invite to the workspace, plus an API key if you need one.
              </span>
            </span>
          </div>
          <div className="flex items-center gap-4 rounded-[18px] bg-night-2 p-4">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-[14px] bg-pale text-night">
              <L n="gift" size={18} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="label !text-night-muted">
                Step 3
              </span>
              <span className="text-[15px] leading-snug">
                Your first month of Pro is on us.
              </span>
            </span>
          </div>
        </div>
        <div className="folder tone-paper lined mt-0 p-8 max-[480px]:p-5">
          <span className="folder-tab">
            Request an invite · wave 1
          </span>
          <AccessForm />
        </div>
      </div>
    </main>
  )
}
